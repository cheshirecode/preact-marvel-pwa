import { h, Component } from 'preact';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';

import { routeTo } from '../utils/routeHandler';
import baseRouteList from '../utils/routes';
import { compose, getContext, withProps } from 'recompose';

const enhance = compose(
  getContext(),
  withProps(({ isAuthenticated, routeList = baseRouteList }) => ({
    //if a route requires authentication, it's only available after login
    routeList: routeList.filter(route => !(route.isAuthenticated ^ isAuthenticated))
  }))
);

class Header extends Component {
  closeDrawer() {
    this.drawer.MDComponent.open = false;
    this.state = { darkThemeEnabled: false };
  }

  openDrawer = () => (this.drawer.MDComponent.open = true);

  openSettings = () => this.dialog.MDComponent.show();

  drawerRef = drawer => (this.drawer = drawer);
  dialogRef = dialog => (this.dialog = dialog);

  routeTo = path => () => {
    routeTo(path)();
    this.closeDrawer();
  };

  routeToHome = this.routeTo('/home');
  routeToRegistration = this.routeTo('/registration');
  routeToLogin = this.routeTo('/login');

  render = () => (
    <div>
      <Toolbar className="toolbar">
        <Toolbar.Row>
          <Toolbar.Section align-start>
            <Toolbar.Icon menu onClick={this.openDrawer}>
              menu
            </Toolbar.Icon>
            <Toolbar.Title>Docker Preact Marvellous PWA</Toolbar.Title>
          </Toolbar.Section>
        </Toolbar.Row>
      </Toolbar>
      <Drawer.TemporaryDrawer ref={this.drawerRef}>
        <Drawer.TemporaryDrawerContent>
          <List>
            {this.props.routeList.map(({ name, path, icon }) => (
              <List.LinkItem onClick={this.routeTo(path)}>
                <List.ItemIcon>{icon}</List.ItemIcon>
                {name}
              </List.LinkItem>
            ))}
          </List>
        </Drawer.TemporaryDrawerContent>
      </Drawer.TemporaryDrawer>
    </div>
  );
}

export default enhance(Header);
