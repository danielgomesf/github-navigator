import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';

import api from "../../services/api";

export default function Main() {

    const [ newRepo, setNewRepo ] = useState('');
    const [ repo, setRepo ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {

            try{
                setLoading(true);
                const response = await api.get(`repos/${newRepo}`)

                const data = {
                    name: response.data.full_name,
                }

                setRepo([...repo, data ]);
                setNewRepo('');
            }
            catch(error) {
                console.log(error);
            }
            finally{
                setLoading(false);
            }


        }

        submit();

    }, [newRepo, repo]);

    function handleInputChange(e) {
        setNewRepo(e.target.value);
    }

    return(
        <Container>
            <h1>
                <FaGithub size={25}/>
                My Repositories
            </h1>

            <Form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Add Repositories" 
                    value={newRepo}
                    onChange={handleInputChange}
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="#FFF" size={14}/>
                    )}
                </SubmitButton>
            </Form>

        </Container>
    )
}