

const validatee = (form) => {
    const errors = {}

    if (!form.id?.trim()) {
        errors.id = "ID is Required"
    }

    if (!form.name?.trim()) {
        errors.name = "Name is Required"        
    }else if (form.name.length < 3) {
        errors.name = "Name Must be At Least 3 Characters"
    }

     if (!form.fatherName?.trim()) {
        errors.fatherName = "fatherName is Required"        
    }else if (form.fatherName.length < 3){
        errors.fatherName= "fatherName Must be At Least 3 Characters"
    }

    if(form.age === "" || form.age === undefined || form.age === null ){
        errors.age = "Age Is Required"
    }else if (isNaN(form.age)){
        errors.age = "Age Must Be a number"
    }else if (Number(form.age) <= 0){
        errors.age = "Put the correct age"
    }

    
    if (!form.designation?.trim()) {
        errors.designation = "Designation is Required" 
    }

      if (!form.address?.trim()) {
        errors.address = "Address is Required" 
    }

      if (!form.education?.trim()) {
        errors.education = "Education is Required" 
    }

      if (!form.reference?.trim()) {
        errors.reference = "Reference is Required" 
    }

    const phoneFormat = /^03[0-9]{9}$/
    if (!form.phone1) {
        errors.phone1 = "Primary Phone Number Is Required"
    }else if(!phoneFormat.test(form.phone1)){
        errors.phone1 = "Invalid Phone Number Format"
    }

     if (!form.phone2) {
        errors.phone2 = "Secondary Phone Number Is Required"
    }else if(!phoneFormat.test(form.phone2)){
        errors.phone2 = "Invalid Phone Number Format"
    }


    const cnicFormat = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/
    if (!form.cnicNo) {
        errors.cnicNo = "CNIC is required"
    } else if (!cnicFormat.test(form.cnicNo)) {
        errors.cnicNo = "CNIC Format must be XXXXX-XXXXXXX-X"
    }


    const validateFile = (file , fieldName) => {
        if (!file) {
            errors[fieldName] = `${fieldName} is Required`
            return;
        }

        const allowedTypes = ["image/jpeg" , "image/png" , "image/jpg"]
        const maxSize = 2 * 1024 * 1024

        if (!allowedTypes.includes(file.type)) {
            errors[fieldName] = "Only JPG/PNG/JPEG images are allowed"
        }

        if (file.size > maxSize) {
            errors[fieldName] = "File size must be less than 2MB"
        }
    }

validateFile(form.profilePic , "profilePic")
validateFile(form.cnicFront , "cnicFront")
validateFile(form.cnicBack , "cnicBack")

return errors;
};

export default validatee