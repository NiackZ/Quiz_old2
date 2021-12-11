import { useContext } from 'react';
import { Tab, Tabs } from 'react-bootstrap'
import './Tabs.css'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

function ControlledTabs({ tabs, ...props }) {
	const { modal } = useContext(Context)

	if (tabs == null) 
		return <h3 className="text-center">Tabs is null</h3>

	return (<Tabs
		id="controlled-tab"
		activeKey={modal.modalFocus}
		onSelect={(k) => modal.setModalFocus(k)}
		className="mb-3"
	>
		{tabs.map((tab)=>
			<Tab eventKey={tab.eventKey} title={tab.title}>
				{tab.content}
			</Tab>
		)}
	</Tabs>
	);
}

export default observer(ControlledTabs)