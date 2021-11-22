import { Grid } from "semantic-ui-react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function Layout() {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header />
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Outlet />
                        </Grid.Column>
                    </Grid.Row>
        </Grid>
    );
}