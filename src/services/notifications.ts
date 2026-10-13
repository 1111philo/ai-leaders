export interface PartnerInquiryData {
    company: string;
    name: string;
    email: string;
    technology: string;
}

export const sendPartnerInquiry = async (data: PartnerInquiryData): Promise<boolean> => {
    const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;

    if (import.meta.env.VITE_DISABLE_SLACK === 'true') {
        console.info('Slack partner notifications are disabled (VITE_DISABLE_SLACK=true). Skipping.');
        return true;
    }

    if (!webhookUrl) {
        console.warn('Slack Webhook URL not configured (VITE_SLACK_WEBHOOK_URL)');
        return false;
    }

    try {
        const payload = {
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "🤝 New Partner Inquiry",
                        emoji: true
                    }
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Company:*\n${data.company}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Contact:*\n${data.name}`
                        }
                    ]
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Email:*\n${data.email}`
                        }
                    ]
                },
                {
                    type: "divider"
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*Technology / Needs:*\n>${data.technology.replace(/\n/g, "\n>")}`
                    }
                }
            ]
        };

        await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(payload)
        });

        return true;
    } catch (error) {
        console.error('Error sending partner inquiry:', error);
        return false;
    }
};

export interface UniversityInquiryData {
    institution: string;
    name: string;
    email: string;
    message: string;
}

export const sendUniversityInquiry = async (data: UniversityInquiryData): Promise<boolean> => {
    const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;

    if (import.meta.env.VITE_DISABLE_SLACK === 'true') {
        console.info('Slack university notifications are disabled (VITE_DISABLE_SLACK=true). Skipping.');
        return true;
    }

    if (!webhookUrl) {
        console.warn('Slack Webhook URL not configured (VITE_SLACK_WEBHOOK_URL)');
        return false;
    }

    try {
        const payload = {
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "🎓 New University Inquiry",
                        emoji: true
                    }
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Institution:*\n${data.institution}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Contact:*\n${data.name}`
                        }
                    ]
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Email:*\n${data.email}`
                        }
                    ]
                },
                {
                    type: "divider"
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*Message:*\n>${data.message.replace(/\n/g, "\n>")}`
                    }
                }
            ]
        };

        await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(payload)
        });

        return true;
    } catch (error) {
        console.error('Error sending university inquiry:', error);
        return false;
    }
};
