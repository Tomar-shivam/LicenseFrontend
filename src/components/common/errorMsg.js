import { toast } from "react-toastify";
import React from "react";
const ErrorMessage = (msg) => {
    return (
        <>
            {toast.error(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })}
        </>
    )

}
export default ErrorMessage;