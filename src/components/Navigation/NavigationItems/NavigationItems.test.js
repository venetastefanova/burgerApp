import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()}); //connecting enzyme

describe('<NavigationItems/> was rendered', ()=>{
    let wrapper;

    // automatically executed before all tests
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems/>);
    }); 
    it('it should render 2 <NavigationItem/> elements if not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2); // checks if the components renders 2 items
    });
    it('it should render 3 <NavigationItem/> elements if authenticated', ()=>{
        wrapper.setProps({isAuthenticated:true}) // adds props to the global wrapper defined in the beforeEach
        expect(wrapper.find(NavigationItem)).toHaveLength(3); // checks if the components renders 2 items
    });
    it('it should have exact logout button', ()=>{
        wrapper.setProps({isAuthenticated:true}) // adds props to the global wrapper defined in the beforeEach
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});

