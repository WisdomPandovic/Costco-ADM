import {Link} from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import {FaFacebook} from 'react-icons/fa';
import {FaTwitter} from 'react-icons/fa';
import {FaApple} from 'react-icons/fa';
import {FaGoogle} from 'react-icons/fa';
import {FaYahoo} from 'react-icons/fa';
import {BsArrowLeftShort} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { CostcoContext } from '../Context/CostcoContext';
import axios from "axios";

import './Register.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function  ForgotPassword(){

    const sendPasswordResetEmail = async (email) => {
        try {
          // Assuming you have an API endpoint to handle the password reset request
          const response = await axios.post('http://localhost:3008/reset-password', { email });
    
          if (response.data.success) {
            toast.success('Password reset email sent successfully!');
          } else {
            toast.error('Failed to send password reset email. Please try again later.');
          }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while sending the password reset email. Please try again later.');
          }
        };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
    
        if (email) {
          sendPasswordResetEmail(email);
        } else {
          toast.error('Please enter your email address.');
        }
      };
    return(
        <div className="reg-bk">
        <div className='reg-text'><h2>Costco Admin</h2></div>

        <div className="form-heading2">
            <h2>Find Your Account</h2>
        </div>
        <div className="form-heading2">
            <h2>Please enter your email address to search for your account.</h2>
        </div>
        <div className='bk-1'>

            <form className="form-content-reg" onSubmit={handleFormSubmit}>
                <div className="form-control">
                    <input type="text" name="email" placeholder='Email Address' />
                </div>

                <div className="flexs">
                   <button >Search</button>
                </div>
                <div className="form-btn2">
                
                </div>
                <ToastContainer />
             </form>
        </div>
    </div>
    )
}
export default ForgotPassword;