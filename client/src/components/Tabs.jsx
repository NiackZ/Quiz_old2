import React, { useContext, useEffect } from 'react';
import { Fade, Tab, Tabs } from 'react-bootstrap'
import './Tabs.css'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

function ControlledTabs({ tabs, ...props }) {
	const { modal } = useContext(Context)
	
	useEffect(async()=>modal.setModalFocus(tabs[0].eventKey),[])

	if (tabs == null) 
		return <h3 className="text-center">Tabs is null</h3>

	return (<Tabs
		id="controlled-tab"
		activeKey={modal.modalFocus}
		onSelect={(k) => modal.setModalFocus(k)}
		className={props.className ? props.className+" mb-3": "mb-3"}
		transition={Fade}
	>
		{tabs.map((tab)=>
			<Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title}>
				{tab.content}
			</Tab>
		)}
	</Tabs>
	);
}

export default observer(ControlledTabs)