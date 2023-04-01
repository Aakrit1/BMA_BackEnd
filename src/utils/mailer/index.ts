import { promises as fs } from 'fs';
import { join } from 'path';
import Logger from '../../loaders/logger';
import { createNodemailerMail, sendEmail } from './awsService';
import { getTemplatedString } from './templateService';

const delay = (delayInms: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
};

interface attachmentsArgs {
    filename: string;
    path: string;
    cid?: string;
}

const mailerService = async (
    template: string,
    subject: string,
    data: any,
    attachments?: attachmentsArgs[]
) => {
    const path = `/public/template/${template}.html`;
    let htmlBuffer = await fs.readFile(join(__dirname, '/../../../', path));
    let mail = createNodemailerMail(
        getTemplatedString(data, htmlBuffer.toString()),
        '',
        subject,
        data.email,
        attachments
    );

    await delay(500);
    try {
        Logger.info(mail);
        await sendEmail(mail);
    } catch (err) {
        Logger.error(err || 'Error sending SES email');
        throw err;
    }
};

export default mailerService;
