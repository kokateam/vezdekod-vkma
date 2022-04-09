import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader,
    PanelHeaderBack,
    Group,
    Placeholder,
    FormLayout,
    FormItem,
    Input,
    Button,
    MiniInfoCell,
    Div
} from "@vkontakte/vkui";
import { Icon56FaceIdOutline, Icon20UserSquareOutline, Icon20PlaceOutline  } from '@vkontakte/icons';
import { set, setNameMember } from '../../reducers/gameReducer';

function HomePanelPlaceholder({ router }) {
    const isDesktop = useSelector((state => state.main.isDesktop))
    const gameStorage = useSelector((state) => state.game)
    const [isGot, setGot] = useState(false)
    const dispatch = useDispatch()
    
    return(
        <>
            <PanelHeader 
                separator={isDesktop}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Подготовка к игре
            </PanelHeader>

            {!isGot &&
                <Group>
                    <Placeholder
                        icon={<Icon56FaceIdOutline />}
                        header={`Привет, ${
                            gameStorage.members[gameStorage.activeMember].name.length === 0 ?
                                `Игрок-${gameStorage.activeMember + 1}` :
                                gameStorage.members[gameStorage.activeMember].name
                        }`}
                    >
                        Введите свое имя, получите роль
                        и передайте устройство другому игроку!
                    </Placeholder>

                    <FormLayout>
                        <FormItem top={'Имя'}>
                            <Input
                                placeholder={'Введите ваше имя...'}
                                value={gameStorage.members[gameStorage.activeMember].name}
                                onChange={(e) =>
                                    dispatch(setNameMember({ index: gameStorage.activeMember, value: e.currentTarget.value }))
                                }
                            />
                        </FormItem>

                        <FormItem>
                            <Button
                                size={'l'}
                                stretched
                                disabled={gameStorage.members[gameStorage.activeMember].name.length === 0}
                                onClick={() => setGot(true)}
                                type={'submit'}
                            >
                                Получить роль
                            </Button>
                        </FormItem>
                    </FormLayout>
                </Group>
            }

            {isGot &&
                <Group>
                    <MiniInfoCell
                        before={<Icon20UserSquareOutline/>}
                        textLevel={'primary'}
                        textWrap={'full'}
                    >
                        {gameStorage.members[gameStorage.activeMember].name}, ваша роль: {" "}
                        <b>{gameStorage.members[gameStorage.activeMember].isSpy ?
                            "Шпион" :
                            gameStorage.members[gameStorage.activeMember].job
                        }</b>
                    </MiniInfoCell>

                    {!gameStorage.members[gameStorage.activeMember].isSpy ?
                        <>
                            <MiniInfoCell
                                before={<Icon20PlaceOutline />}
                                textLevel={'primary'}
                                textWrap={'full'}
                            >
                                Локация: <b>{gameStorage.location.name}</b>
                            </MiniInfoCell>

                            <Div>
                                <img
                                    alt={gameStorage.location.name}
                                    src={gameStorage.location.photo}
                                    className={'imgStartGame'}
                                />
                            </Div>
                        </> :
                        <div className={'div-center'}>
                            <img
                                src={'https://meme-police.ru/spyfall/spy.jpg'}
                                alt={'Шпион'}
                                className={'imgStartGame'}
                            />
                        </div>
                    }

                    <Div>
                        <Button
                            size={'l'}
                            stretched
                            onClick={() => {
                                if (gameStorage.members.length === gameStorage.activeMember + 1) {
                                    router.toPanel('game')
                                    return dispatch(set({ key: 'activeMember', value: 0 }))
                                }

                                dispatch(set({ key: 'activeMember', value: gameStorage.activeMember + 1 }))
                                setGot(false)
                            }}
                        >
                            {gameStorage.members.length === gameStorage.activeMember + 1 ? 'Начать игру!' : 'Следующий'}
                        </Button>
                    </Div>
                </Group>
            }
        </>
    )
}
//var(--destructive)
export default withRouter(HomePanelPlaceholder);