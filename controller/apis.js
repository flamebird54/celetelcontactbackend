import apis from "../model/apis";
import bcrypt from 'bcrypt';
import responseMessages from '../responseMessage'
import contactUs from "../model/contactus";
import axios from "axios";

export const userFormSignup = async (req, res) => {
    console.log("enter");
    try {
        const { first_name, last_name, email, password } = req.body;

        console.log(req.body, "req.body");
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await apis.findOne({ email });

        if (existingAdmin) {
            throw new Error('Admin with this email already exists');
        }

        const userData = new apis({ first_name, last_name, email, password: hashedPassword });
        const result = await userData.save();

        res.send({
            status: 200,
            success: true,
            msg: 'user registered successfully',
            result: result._doc
        });
    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message });
    }
};


export const userFormLogin = async (req, res) => {
    try {
        const { email, password, reCaptcha } = req.body;
        console.log(req.body, "req.body");

        // Verify reCAPTCHA token
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptcha}`);
        console.log(response, "responseofrecaptcha")

        if (!response.data.success) {
            throw new Error('reCAPTCHA verification failed');
        }

        const userData = await apis.findOne({ email });
        console.log(userData, "gfkjl;");

        if (!userData) {
            throw new Error('userNotFound');
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            throw new Error('incorrectPassword');
        }

        res.send({
            status: responseMessages.loginSuccess.statusCode,
            success: true,
            msg: responseMessages.loginSuccess.message,
        });
    } catch (error) {
        const errorMsg = responseMessages[error.message] || responseMessages.genericError;

        res.send({
            status: errorMsg.statusCode,
            success: false,
            msg: errorMsg.message,
        });

        console.log(errorMsg.message);
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, "idnew");
        const user = await apis.findById(id);
        console.log(user)

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send({
            status: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            user,
        });
    } catch (error) {
        res.status(500).send('An error occurred while fetching the user');
    }
};




export const contactusInfo = async (req, res) => {
    try {
        const { name, email, phone, projectType, message } = req.body;

        // Save the contact info in MongoDB
        const result = await contactUs.create({ name, email, phone, projectType, message });

        // Slack Webhook URL from environment variables
        const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
        console.log("Slack Webhook URL:", slackWebhookUrl);

        // Send the message to Slack
        const slackMessage = {
            text: `*New Contact Form Submission from Celetel*\n\n*User Information:*\n- *Name:* ${name}\n- *Email:* ${email}\n- *Phone:* ${phone}\n- *Project Type:* ${projectType}\n- *Message:* ${message}`
        };


        await axios.post(slackWebhookUrl, slackMessage);

        res.status(200).json({
            success: true,
            msg: 'Thank you for getting in touch! We will connect with you shortly.',
            result
        });
    } catch (error) {
        console.error('Error in contactusInfo:', error);
        res.status(400).json({ success: false, msg: error.message });
    }
};