import React, { useState, useEffect } from "react";
import { Container, Loading ,Owner, BackButton, IssuesList } from "../Repo/styles";
import { FaArrowLeft } from 'react-icons/fa'
import api from "../../services/api";

export default function Repo({match}) {

    const [ repository, setRepository ] = useState({});
    const [ issues, setIssues ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {

        async function load(){
            const nameRepo = decodeURIComponent(match.params.repo);

            const [ repoData, issuesData ] = await Promise.all([
                api.get(`/repos/${nameRepo}`),
                api.get(`/repos/${nameRepo}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                })
            ]);

            setRepository(repoData.data);
            setIssues(issuesData.data);
            setLoading(false);


        };

        load()

    }, [match.params.repo])


    if(loading) {
        return(
            <Loading>
                <h1>Loading...</h1>
            </Loading>
        )
    }

    return(
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={30} />
            </BackButton>
            <Owner>
                <img 
                    src={repository.owner.avatar_url} 
                    alt={repository.owner.login} 
                />
                <h1>
                    {repository.name}
                </h1>
                <p>
                    {repository.description}
                </p>
            </Owner>

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img 
                            src={issue.user.avatar_url} 
                            alt={issue.user.login} 
                        />
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>

                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>
                                        {label.name}
                                    </span>
                                ))}
                            </strong>
                            <p>
                                {issue.user.login}
                            </p>
                        </div>
                    </li>
                ))}
            </IssuesList>
        </Container>
    )
}