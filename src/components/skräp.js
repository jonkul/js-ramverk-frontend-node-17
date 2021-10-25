/* test("Reset db and find expected elements", () => {
    sleep(200);
    const { getByTestId, getByDisplayValue } = render(<App />);
    sleep(200);
    screen.debug();
    
    it('should reset ok', async () => {
        act(() => {
        fireEvent.click(getByTestId('resetbutton'));
        });
        
        await waitFor(() => {
            expect(getByTestId('myul')).toHaveTextContent("Dokument1");
        });
        await waitFor(() => {
            expect(getByTestId('myul')).toHaveTextContent("Dokument2");
        });
        await waitFor(() => {
            expect(getByTestId('myul')).toHaveTextContent("Dokument3");
        });
        
        //expect(getByTestId('myul')).toHaveTextContent("Dokument2");
        //expect(getByTestId('myul')).toHaveTextContent("Dokument3");
        // expect(getByTestId('myul')).toHaveTextContent("What is Lorem Ipsum?");
        expect(getByTestId.find('h3')).toHaveLength(1);
        
        act(() => {
        fireEvent.click(getByTestId('newbutton'));
        });
        
        await waitFor(() => {
            expect(getByTestId('myul')).toHaveTextContent("New document");
        });

        act(() => {
        fireEvent.click(getByTestId('Dokument1'));
        });

        await waitFor(() => {
            expect(getByDisplayValue('')).toHaveTextContent('Lorem');
            //expect(isElement('trix-editor'));
            //expect(getByTestId('trix-editor')).toHaveTextContent("What is Lorem Ipsum?");
        });
}); */









/* it("should change the button's text color", async () => {
  const text = "foobar";
  //fireEvent.press(queryByText(text));
  await waitFor(() => {
    const {debug, queryByText} = render(<App />);
    //expect(queryByText(text)).toHaveStyle({color: "green"});
  });
}); */











/* describe('Async Promise Test Suite', () => {

    it('A test involving flushPromises', async () => {
        const wrapper = mount(<List/>);
        await flushPromises();
        wrapper.update()
        expect(wrapper.find('h3')).toHaveLength(1);
    });

    let wrapper;

    it('Will not work correctly without flushing promises', async () => {
        let a;
        let b;

        Promise.resolve().then(() => {
            wrapper = mount(<App />);
        }).then(() => {
            b = 2;
        })

        await flushPromises();

        expect(wrapper.find('h3')).toHaveLength(1);
        expect(b).toBe(2);
        const linkElement2 = screen.getByText('');
        // const linkElement3 = screen.getByText('Dokument1');
        expect(linkElement2).toBeInTheDocument();
        // expect(linkElement3).toBeInTheDocument();
        expect(wrapper.find('li')).toHaveLength(1);
    });

}); */




/* describe('When rendering Parent', () => {
    var parent;

    beforeAll(() => {
        parent = mount(<App />)
    });

    it('should display Child with response of the service', () => {
        expect.assertions(1);

        return List().then( () => {
            expect(parent.find('h3')).toHaveLength(1);
        });
    });
});
 */




/* const flushPromises = () => new Promise(setImmediate);

let wrapper;

beforeEach(() => {
    wrapper = mount(<App />);
});

describe('<App /> rendering', () => {
    it('should render one <h1>', () => {
        expect(wrapper.find('h1')).toHaveLength(1);
    });

    it('should render one <h3>', () => {
        expect(wrapper.find('h3')).toHaveLength(1);
    });

    it('should render one <h3>', async () => {
        const wrapperb = mount(<App />);
        await flushPromises();
        wrapperb.update();
        expect(wrapperb.find('h3')).toHaveLength(1);
    });

    it('should render one <img>', () => {
        expect(wrapper.find('img')).toHaveLength(1);
    });
}); */



/* 
  test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/My little React/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders the top controls', async () => {
  await render(<App />);
  const linkElement2 = screen.getByText('Loading...');
  expect(linkElement2).toBeInTheDocument();
});

test('renders the top controls, 2', async () => {
  await render(<App />);
  const linkElement2 = screen.getByText('Active');
  expect(linkElement2).toBeInTheDocument();
});
 */







//const datadef = {data: [{_id: "123", name: 'Dokument1', html: 'Placeholder1'}, {_id: "234", name: 'Dokument2', html: 'Placeholder2'}, {_id: "345", name: 'Dokument3', html: 'Placeholder3'}]};
    /* const [liClicked, setLiClicked] = useState({
        _id: "",
        name: "",
        html: ""
    }); */

    //console.log({liClicked});







//test


/* test('clicks the New button, finds "New document"', async () => {
        render(<App />);

        expect(await screen.findByText('Dokument1')).toBeInTheDocument();
        //screen.debug();
    }); */


//expect(screen.queryByText('New document')).toBeNull();


/* await act(async () => {
            fireEvent.click(screen.getByText('Dokument1'));
        }); */


        //await userEvent.click(screen.getByText('New'));

        /* await act(async () => {
            await screen.findByText('New').simulate('click');
        }); */

        /* await act(async () => {
            fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'test input' },
            });
        }); */

        //expect(await screen.findByText('test input')).toBeInTheDocument();




//screen.debug();

//for producing snapshots
/* test("Expect tree to match snapshot", async () => {
    const component = renderer.create(
        <App />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
}); */
///////////




/* act(() => {
        screen.find('NewButton').simulate('click');
    }); */
 
    /* expect(screen.queryByText(/Signed in as/)).toBeNull();
 
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument(); */




/* it('Create new document and find it', async () => {
    const component = mount(
        <App
        />
    );

    console.log(component);

    await act(async () => {
        await Promise.resolve(component);
        await new Promise(resolve => setImmediate(resolve));
        //component.update();
    });

    await act(async () => {
        console.log(component.debug());
    });

    await act(async () => {
        sleep(300);
    });

    await waitFor(() => {
        expect(component.find('li')).toHaveLength(3);
    });

    await act(async () => {
        console.log(component.debug());
    });

    act(() => {
        component.find('NewButton').simulate('click');
    });

    await act(async () => {
        await Promise.resolve(component);
        await new Promise(resolve => setImmediate(resolve));
        component.update();
    });

    await waitFor(() => {
        expect(component.find('li')).toHaveLength(4);
    }); 
}); */






 //for producing snapshots
/* test("Manage to reset the db and then find the 3 default docs", async () => {
    const { getByTestId, getByDisplayValue } = render(<App />);

    act(() => {
        fireEvent.click(getByTestId('resetbutton'));
    });

    await waitFor(() => {
        expect(getByTestId('myul')).toHaveTextContent("Dokument1");
    });

    await waitFor(() => {
        expect(getByTestId('myul')).toHaveTextContent("Dokument2");
    });

    await waitFor(() => {
        expect(getByTestId('myul')).toHaveTextContent("Dokument3");
    });

    act(() => {
        fireEvent.click(getByTestId('resetbutton'));
    });
}); */
///////////



//for producing snapshots
/* test("Manage to create a new document and find it", async () => {
    const { getById, getByDisplayValue } = render(<App />);

    act(() => {
        fireEvent.click(getById('newbutton'));
    });

    await waitFor(() => {
        expect(getById('myul')).toHaveTextContent("Dokument1");
    });

    await waitFor(() => {
        expect(getById('myul')).toHaveTextContent("Dokument2");
    });

    await waitFor(() => {
        expect(getById('myul')).toHaveTextContent("Dokument3");
    });

    await waitFor(() => {
        expect(getById('myul')).toHaveTextContent("New document");
    });

    act(() => {
        fireEvent.click(getById('resetbutton'));
    });
///////////
}); */



/* describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    screen.debug();
  });
}); */




/* const flushPromises = require('flush-promises');
configure({ adapter: new Adapter() });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} */

//afterEach(cleanup);


/* import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import userEvent from '@testing-library/user-event'; */

//import List from './components/list';
//import NewButton from './components/newbutton';
//import { ReactTrixRTEInput } from "react-trix-rte";


/* import {
  fireEvent,
  TestRenderer,
  render,
  screen,
  cleanup,
  waitFor,
  act
} from "@testing-library/react"; */






/* //FUNCTION FOR GETTING DATABASE DOCS
    useEffect(() => {
        let active = true;

        const fetchedData = async () => {
            const response = await fetchData();
            if (active) {
                setData(response.data);
            }
        };

        //call it
        fetchedData();
            return () => {
                active = false;
            };
    }, []); */



/* .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
            throw error;
        }); */










        /* test('clicks New button', async () => {
            const {rerender} = render(<App />);
    
            //sets up for the final test
             var mhm = await screen.findByText('New');
            /*act(() => {
                userEvent.click(mhm);
            });
    
            await act(async () => {
                userEvent.click(mhm);
            });
            
            rerender(<App />)
    
            /* await waitFor(() => {
                //act(() => {
                //    sleep(3000);
                //});
        
                //rerender(<App />)
                
                //expect(await screen.findByText('New document')).toBeInTheDocument();
                //await (waitFor(() => screen.getByText('New document'),{timeout:3000}));
                expect(screen.getByText('New document')).toBeInTheDocument();
            })
    
            await (waitFor(() => expect(screen.getByText('New document')).toBeInTheDocument(),{timeout:3000}));
    
            /* expect(await screen.findByText('New document')).toBeInTheDocument();
            await (waitFor(() => screen.getByText('New document'),{timeout:3000}));
        }); */