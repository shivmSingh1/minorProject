export const isPasswordValid = (password)=> {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
    const hasLowercase = /[a-z]/.test(password); // At least one lowercase letter
    const hasNumber = /\d/.test(password);       // At least one digit

    if(password === ""){
        return "empty";
    }

    if (password.length < minLength || !hasUppercase || !hasLowercase || !hasNumber) {
        return `Week Password`;
    }else{
        return `Strong Password`;
    }
}