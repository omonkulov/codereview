import React, { useReducer, useState } from 'react';

/**
 * https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react
 * This is an uncontrolled component, it is a componenet that does not have
 * a value set by React.
 */
const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function Form(props) {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);



    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 3000);
        const testArray = [];
        testArray[0] = JSON.parse(localStorage.getItem('myValueInLocalStorage'));
        testArray.push(formData);
        localStorage.setItem('myValueInLocalStorage', JSON.stringify(testArray));
    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }


    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}> {/*Yuck... this is how you comment in html area*/}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}></input>
                    <div id="emailHelp" className="form-text">We'll definitely share your email with everyone we know.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange}></input>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                    <label name="ischecked" className="form-check-label" htmlFor="exampleCheck1" onChange={handleChange}>Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {submitting &&
                <div>
                    <ul>
                        {Object.entries(formData).map(([name, value]) => (
                            <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
}

export default Form;