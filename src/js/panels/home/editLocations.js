import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Group,
    Header,
    SimpleCell,
    Div,
    Card,
} from "@vkontakte/vkui";
import Location from "../../components/Location";
import PageFooter from "../../components/PageFooter";
import { Icon56GestureOutline, Icon28AddOutline,} from '@vkontakte/icons';

import { set } from "../../reducers/locationsReducer";

function HomePanelEditLocations({ router }) {
    const isDesktop = useSelector((state => state.main.isDesktop))
    const locationsStorage = useSelector((state => state.locations))
    const dispatch = useDispatch()

    return(
        <>
            <PanelHeader
                separator={isDesktop}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Локации
            </PanelHeader>

            <Group>
                <Placeholder
                    icon={<Icon56GestureOutline/>}
                    header='Приветик!'
                >
                    Здесь вы можете добавлять, редактировать и удалять текущие локации игры!
                </Placeholder>

                <Div className={"DivFixBottom"}>
                    <Card className={`expandCard ${isDesktop ? "expandCardPC" : ""}`}>
                        <SimpleCell
                            disabled={locationsStorage.changePositions}
                            expandable
                            before={
                                <Card mode={"outline"} className={"buttonIcon"}>
                                    <Icon28AddOutline />
                                </Card>
                            }
                            onClick={async () => {
                                await dispatch(set({ key: 'editData', value: [] }))
                                router.toPanel('addLocation')
                            }}
                        >
                            Добавить локацию
                        </SimpleCell>
                    </Card>
                </Div>

                <Header>Локации</Header>
                <div className={'locations'}>
                    {locationsStorage.locations.map((el) => {
                        return (
                            <Location
                                dataLocation={el}
                                onClick={async () => {
                                    await dispatch(set({ key: 'editData', value: el }))
                                    router.toModal('editLocation')
                                }}
                            />
                        )
                    })}
                </div>

                <PageFooter
                    length={locationsStorage.locations.length}
                    findText={"Всего %V%."}
                    locales={["%V% локация", "%V% локации", "%V% локаций"]}
                    dataLength={locationsStorage.locations.length}
                />
            </Group>
        </>
    )
}

export default withRouter(HomePanelEditLocations);