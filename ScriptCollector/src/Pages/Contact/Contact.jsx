import { Link } from "react-router-dom";
import { useState } from 'react';
import styles from "./Contact.module.scss";
import { useForm } from "react-hook-form";

function Contact() {

    const [submitted, setSubmitted] = useState(false);

    const {handleSubmit, register, formState : {errors}} = useForm();

    const onSubmit = (data) =>{
        console.log(data);
        setSubmitted(true);
    }

    return (
        <div>
            {submitted ? (
                <div>
                    <p>Nous tenons à vous remercier chaleureusement pour votre message.<br/> Votre intérêt et votre engagement sont très appréciés. Nous sommes ravis de recevoir vos commentaires. Nous sommes conscients de l'importance de votre temps et nous vous assurons que nous donnerons suite à votre message dans les plus brefs délais.<br/><br/> Votre satisfaction est notre priorité et nous ferons de notre mieux pour répondre à vos attentes. Encore une fois, merci pour votre contribution et votre confiance. Nous sommes impatients de vous apporter des réponses satisfaisantes.<br/><br/>Cordialement,<br/><br/>L'équipe de ScriptCollector</p>
                </div>
            ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email : 
                        <input type="text" {...register("email", {required : true})} />
                    </label>
                    {errors.email && <p>Ce champs est requis.</p>}
                </div>
                <div>
                    <label>Sujet : 
                        <input type="text" {...register("sujet", {required : true})} />
                    </label>
                    {errors.sujet && <p>Ce champs est requis.</p>}
                </div>
                <div>
                    <label>Message : 
                        <textarea {...register("message", {required : true})} />
                    </label>
                    {errors.message && <p>Ce champs est requis.</p>}
                </div>
                <button type="submit">Envoyer</button>
            </form>
            )}
        </div>
    )
}

export default Contact;