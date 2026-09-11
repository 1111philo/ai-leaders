export interface EmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (import.meta.env.VITE_DISABLE_EMAIL === 'true') {
        console.info('Email notifications are disabled (VITE_DISABLE_EMAIL=true). Skipping.');
        return true;
    }

    if (!accessKey) {
        console.warn('Web3Forms Access Key not configured (VITE_WEB3FORMS_ACCESS_KEY)');
        return false;
    }

    try {
        const formData = new FormData();
        formData.append('access_key', accessKey);
        formData.append('subject', data.subject);
        formData.append('from_name', data.name);
        formData.append('email', data.email);
        formData.append('message', data.message);
        formData.append('to', 'help@ai-leaders.org');

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            console.info('Email sent successfully via Web3Forms');
            return true;
        } else {
            console.error('Web3Forms error:', result.message);
            return false;
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

export const sendPartnerInquiryEmail = async (data: {
    company: string;
    name: string;
    email: string;
    technology: string;
}): Promise<boolean> => {
    return sendEmail({
        name: `${data.name} from ${data.company}`,
        email: data.email,
        subject: '🤝 New Partner Inquiry - AI Leaders',
        message: `
New Partner Inquiry
━━━━━━━━━━━━━━━━━━━━━━

Company: ${data.company}
Contact: ${data.name}
Email: ${data.email}

Technology / Needs:
${data.technology}

━━━━━━━━━━━━━━━━━━━━━━
Sent from ai-leaders.org/partners
        `.trim()
    });
};

export const sendUniversityInquiryEmail = async (data: {
    institution: string;
    name: string;
    email: string;
    message: string;
}): Promise<boolean> => {
    return sendEmail({
        name: `${data.name} from ${data.institution}`,
        email: data.email,
        subject: '🎓 New University Inquiry - AI Leaders',
        message: `
New University Inquiry
━━━━━━━━━━━━━━━━━━━━━━

Institution: ${data.institution}
Contact: ${data.name}
Email: ${data.email}

Message:
${data.message}

━━━━━━━━━━━━━━━━━━━━━━
Sent from ai-leaders.org/universities
        `.trim()
    });
};
