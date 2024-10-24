const { z } = require("zod");

async function validateLead(postData) {
  const leads = z.object({
    email: z.string().email(),
  });

  let hasError;
  let validateData = {};
  let message;
  try {
    validateData = leads.parse(postData);
    hasError = false;
    message = "";
  } catch (error) {
    console.error(error);
    hasError = true;
    message = "Invalid Email. Please try again";
  }
  return { data: validateData, hasError: hasError, message };
}

module.exports.validateLead = validateLead;
