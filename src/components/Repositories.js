import React from 'react';
import { Badge, Row, Col, Table } from 'reactstrap';
import { useQuery, gql } from '@apollo/client';
import Moment from 'react-moment';


const DATA_REPOSITORIES = gql`
    query GetDataRepositories {
    viewer {
     repositories(ownerAffiliations: [OWNER], first: 14, orderBy:{field: UPDATED_AT, direction:DESC}) {  
     totalCount
      nodes {
       name
       nameWithOwner
       description
       updatedAt
     owner {
        login
    }
     primaryLanguage {
        name
        color
    }
     languages(last: 10) {
      nodes {
        name
        color
      }
     }
     collaborators(last: 10) {
      totalCount
      nodes {
       name
          }
        }
      }
    }
  }
    }
`;
const Repositories = () => {


    const { loading, error, data } = useQuery(DATA_REPOSITORIES);

    if (loading) return <p> loading ...</p>
    if (error) return <p> Error: </p>
    const repositories = data.viewer.repositories.nodes


    const lines = (
        repositories.map((repo, index) =>

            <tr key={index} >
                <th scope="row">{index + 1}</th>
                <td>{repo.owner.login}</td>
                <td><span style={{ color: "#555555", fontWeight: "bold" }}>{repo.name}</span> <br /> {repo.description}  <br /> {repo.nameWithOwner}</td>
                <td></td>
                <td>
                    {repo.languages.nodes.map((language, i) =>
                        <Badge key={i} style={{ backgroundColor: language.color, marginLeft: "5px" }} > {language.name}</Badge>
                    )}
                </td>
                <td>{repo.collaborators.totalCount}</td>
            </tr>

        )
    )

    return (
        <Row>
            <Col md="10" style={myStyle.colRepo}>
                <h1 style={{ color: "#555555" }}>Repositories</h1>
                <p>
                    {data.viewer.repositories.totalCount} repos <br></br>
                Last updated:  <Moment format="YYYY/MM/DD - hh : mm : ss ">
                        {repositories[0].updatedAt}
                    </Moment>
                </p>

                <Row>
                    <Col>
                        <Table striped style={{ padding: "40px" }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Owner</th>
                                    <th>Repo</th>
                                    <th>Commit</th>
                                    <th>Languages</th>
                                    <th>Team</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lines}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}

export default Repositories

const myStyle = {
    colRepo: {
        backgroundColor: "white",
        borderRadius: "2px",
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        marginBottom: "40px"
    },

};

