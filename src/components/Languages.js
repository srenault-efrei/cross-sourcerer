import React from 'react';
import { Badge, Row, Col } from 'reactstrap';
import { useQuery, gql } from '@apollo/client';
import Moment from 'react-moment';
import Chart from './Chart';




const DATA_LANGUGAGE = gql`
query GetDataHeader {
 viewer {
    repository(name: "mysql") {
      languages(last:50){
        nodes{
          name
          color
        }
      }
    }
  repositories(ownerAffiliations: [OWNER], first: 1, orderBy:{field: UPDATED_AT, direction:DESC}) {  
     totalCount
      nodes {
       updatedAt
      }
    }
  }
}
`;


const Languages = () => {

    const { loading, error, data } = useQuery(DATA_LANGUGAGE);

    if (loading) return <p> loading ...</p>
    if (error) return <p> Error: </p>

    const { nodes } = data.viewer.repository.languages
    const { totalCount } = data.viewer.repositories
    const { updatedAt} = data.viewer.repositories

    return (

        <Row>
            <Col md="10" style={myStyle.languages}>
                <h1 style={{ color: "#555555" }}>Languages</h1>
                <p>

                    {totalCount} repos <br></br>
                Last updated: <Moment format="YYYY/MM/DD - hh : mm : ss ">
                        {updatedAt}
                    </Moment>
                </p>
                <Row>
                    <Col style={{ display: "flex" }}>

                        {nodes.map((repo, index) =>
                            <div style={myStyle.headDiv} >
                                <Badge style={{ backgroundColor: repo.color }} >{repo.name}</Badge>
                                <div style={myStyle.centerDiv}>Commit: </div>
                                <div>LOC :  </div>
                            </div>
                        )}


                    </Col>
                </Row>
                <Chart></Chart>
            </Col>
        </Row>

    )
}

export default Languages

const myStyle = {
    languages: {
        backgroundColor: "white",
        borderRadius: "2px",
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        marginBottom: "40px"
    },

    headDiv: {
        margin: "20px",
        backgroundColor: "#E3EAE5",
        width: "20rem",
        borderRadius: "2px"
    },

    centerDiv: {

        backgroundColor: "#F0F4F1",

    }
};

