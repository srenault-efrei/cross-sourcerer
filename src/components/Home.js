
import React from 'react';
import Header from './Header';
import Languages from './Languages';
import { Container } from 'reactstrap';
import Repositories from './Repositories';

const Home = () => {
    return (
        <div>
            <Container>
                <Header />
                <Languages />
                <Repositories/>
            </Container>

        </div>
    );
}

export default Home;