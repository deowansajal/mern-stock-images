const emailConfirmationTemplate = ({ req, confirmEmailToken }) => {
    // Create reset url
    const url = `${req.protocol}://${req.get(
        'host'
    )}/api/auth/confirmemail?token=${confirmEmailToken}`

    return `
         <div>
              <p> You are receiving this email because you need to confirm your email address. </p>
              <br>
              <br>
              <button>
                    <a href="${url}">Verify Your Email</a>
              </button>
         </div>   
   `
}

module.exports = emailConfirmationTemplate
