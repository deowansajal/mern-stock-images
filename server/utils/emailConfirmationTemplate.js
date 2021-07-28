const emailConfirmationTemplate = ({ req, confirmEmailToken }) => {
    // Create reset url
    const url = `${req.protocol}://${req.get(
        'host'
    )}/api/auth/confirmemail?token=${confirmEmailToken}`

    return `
         <div>
              <h3> You are receiving this email because you need to confirm your email address. </h3>
              <br>
              <br>
              <button style="border:none; padding: 1rem; background: #0069D9; color: #fff; text-transform: uppercase;">
              <a style="color: #fff; text-decoration: none" href="${url}">Verify Your Email </a>
        </button>
         </div>   
   `
}

module.exports = emailConfirmationTemplate
