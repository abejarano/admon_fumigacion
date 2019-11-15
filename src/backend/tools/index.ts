import bcrypt from 'bcrypt';

// tslint:disable-next-line:no-var-requires
const { dialog, BrowserWindow } = require('electron').remote;

export default class Tools {

    public static makePassword(pass: string) {
        return  bcrypt.hash(pass, 10);
    }
    public showMessageQuestion(question: any): Promise<any> {
        const options = {
            type: 'question',
            buttons: ['Cancel', 'Yes, please', 'No, thanks'],
            defaultId: 2,
            title: 'Question',
            message: question.message,
            detail: question.detail,
            checkboxChecked: false,
        };
        return new Promise( (resolve: any, reject: any) => {
            dialog.showMessageBox(null, options,(response: any) => {
                resolve(response);
            });
        });

    }

    public async getRandom(length: number): Promise<string> {
        let result: string = '';
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let i = length; i > 0; --i) {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result.replace('undefined', '');
    }
    public async comparePassword(pass: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(pass, hash);
    }

}
