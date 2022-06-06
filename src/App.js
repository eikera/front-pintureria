import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';
import FormMaterials from './components/materiales/FormMaterials';


const App = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Panel header="App Pinturería">
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Materiales">
                    <FormMaterials />
                </TabPanel>
                <TabPanel header="Presupuesto">
                    PRoximamente
                </TabPanel>
            </TabView>
        </Panel>
    )
}

export default App;
