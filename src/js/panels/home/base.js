import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    Group,
    PanelHeader,
    PanelHeaderButton,
    Div,
    Button,
    Header,
    Snackbar,
    Avatar
} from '@vkontakte/vkui'
import Location from '../../components/Location';
import PageFooter from '../../components/PageFooter';
import { Icon28HelpCircleOutline, Icon28EditOutline, Icon16Cancel } from '@vkontakte/icons';

function HomePanelBase({ router }) {
    const [snackbar, setSnackbar] = useState(null)
    const locations = useSelector((state => state.locations.locations))
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
                        size="l"
                        appearance="accent"
                        stretched
                        onClick={() => {
                            if (locations.length <= 1) {
                                return setSnackbar(
                                    <Snackbar
                                        layout="vertical"
                                        onClose={() => setSnackbar(null)}
                                        before={
                                            <Avatar size={24} style={{ background: "var(--destructive)" }}>
                                                <Icon16Cancel fill="#fff" width={14} height={14} />
                                            </Avatar>
                                        }
                                    >
                                        До того, как начнёте играть, создайте хотя бы две локации
                                    </Snackbar>
                                )
                            }

                            router.toModal('registGame')
                        }}
                    >
                        Играть оффлайн!
                    </Button>
                </Div>
            </Group>

            <Group header={
                <Header
                    aside={
                        <Button
                            before={<Icon28EditOutline/>}
                            mode="outline"
                            onClick={() => router.toPanel('editLocations')}
                        />
                    }
                >
                    Доступные локации
                </Header>
            }>
                <div className={'locations'}>
                    {locations.map((el) => {
                        return (<Location dataLocation={el}/>)
                    })}
                </div>

                <PageFooter
                    length={locations.length}
                    findText={"Всего %V%."}
                    locales={["%V% локация", "%V% локации", "%V% локаций"]}
                    dataLength={locations.length}
                />
            </Group>

            {snackbar}
        </>
    );
}

export default withRouter(HomePanelBase);