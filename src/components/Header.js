import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Row, Col } from 'reactstrap';


const DATA_HEADER = gql`
    query GetDataHeader {
    viewer {
        login
        avatarUrl
        location
        company
        repositories(ownerAffiliations: [OWNER], last:50){
            totalCount
        }
        following {
      totalCount
    }
    followers {
      totalCount
    }
    }    
    }
`;

const Header = () => {


    const { loading, error, data } = useQuery(DATA_HEADER);

    if (loading) return <p> loading ...</p>
    if (error) return <p> Error: </p>

    const viewer = data.viewer
    return (

        <Row>
            <Col md="10" style={myStyle.header}>
                <h1 style={{ color: "#555555" }}>{viewer.login}</h1>
                <p>
                    {viewer.company} -  {viewer.location}
                </p>
                <img style={myStyle.avatar}
                    src={viewer.avatarUrl}
                    alt="Avatar">
                </img>

                <Row>
                    <Col style={{ display: "flex" }}>

                        <div style={myStyle.startDiv}>
                            <span>Commits</span><br />
                            <strong></strong>
                        </div>

                        <div style={myStyle.startDiv}>
                            <span>Repos</span><br />
                            <strong>{viewer.repositories.totalCount}</strong>
                        </div>

                        <div style={myStyle.startDiv}>
                            <span>Lines of code</span><br />
                            <strong></strong>
                        </div>

                        <div style={myStyle.endDiv}>
                            <span>Following</span><br />
                            <strong>{viewer.following.totalCount}</strong>
                        </div>


                        <div style={myStyle.endDiv}>
                            <span>Followers</span><br />
                            <strong>{viewer.following.totalCount}</strong>
                        </div>

                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Header;


const myStyle = {
    header: {
        backgroundColor: "white",
        borderRadius: "2px",
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",

    },
    avatar: {
        widht: "100px",
        height: "100px",
    },
    startDiv: {
        margin: "20px",
        backgroundColor: "#E3EAE5",
        width: "10rem"
    },
    endDiv: {
        margin: "20px",
        backgroundColor: "#C0F1E2",
        width: "10rem"
    }
};
