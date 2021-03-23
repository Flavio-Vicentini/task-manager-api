import sgMail from '@sendgrid/mail'


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'juninhovicentinijr@hotmail.com',
        subject: 'Thansk for joining in!',
        text: `Welcome to the Task App Manager,${name}! Let me know how you get along with the app!`
    })
}

const sendCancelationEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'juninhovicentinijr@hotmail.com',
        subject: 'Sorry to see you go!',
        text: `Hope see you again,${name}! Let me know why you want to leave the app, send me a message!`
    })
}



export {sendWelcomeEmail, sendCancelationEmail};
