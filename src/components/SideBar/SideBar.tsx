import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {routes} from "../../router";

const active = {
   // color: '#ff0000',
    fontWeight:700
};

const SideBar: React.FC = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                <li><NavLink className='sidebar-title' to={routes.reviewState} activeStyle={active}>Review State</NavLink></li>
                <li><NavLink className='sidebar-title' to={routes.proposals} activeStyle={active}>Proposals</NavLink></li>
                <li><NavLink className='sidebar-title' to={routes.adminModule} activeStyle={active}>Admin Module</NavLink></li>
            </ul>
        </div>
    );
};

export const Sidebar = withRouter(SideBar);
