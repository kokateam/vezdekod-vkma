import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    Group,
    PanelHeader,
    PanelHeaderButton,
    Div,
    Button,
    Header
} from '@vkontakte/vkui'
import Location from '../../components/Location';
import { Icon28GlobeOutline, Icon28HelpCircleOutline } from '@vkontakte/icons';
import locations from '../../../data/locations.json';

function HomePanelBase({ router }) {
    const isDesktop = useSelector((state => state.main.isDesktop))

    return (
        <>
            <PanelHeader
                left={
                    <PanelHeaderButton href={'https://www.bgames.com.ua/rules/spy2.pdf'} target={'_blank'}>
                        <Icon28HelpCircleOutline/>
                    </PanelHeaderButton>
                }
                separator={isDesktop}
            >
                Шпион
            </PanelHeader>

            <Group>
                <Div>
                    <Button
                        before={<Icon28GlobeOutline/>}
                        size="l"
                        appearance="positive"
                        stretched
                    >
                        Играть онлайн!
                    </Button>
                </Div>

                <Div>
                    <Button
                        size="l"
                        appearance="accent"
                        stretched
                        onClick={() => router.toModal('registGame')}
                    >
                        Играть оффлайн!
                    </Button>
                </Div>
            </Group>

            <Group header={<Header>Доступные локации</Header>}>
                <div className={'locations'}>
                    {locations.map((el) => {
                        return (<Location dataLocation={el}/>)
                    })}
                </div>
            </Group>
        </>
    );
}

export default withRouter(HomePanelBase);