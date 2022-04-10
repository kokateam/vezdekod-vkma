import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader,
    Counter,
    Group,
    Placeholder,
    Button,
    MiniInfoCell,
    Div,
    FixedLayout,
    Separator,
    ButtonGroup,
    Header,
} from "@vkontakte/vkui";
import Location from '../../components/Location';
import {
    Icon20PlaceOutline,
    Icon20UserSquareOutline,
    Icon56GhostOutline,
    Icon56BlockOutline
} from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";
import { set } from '../../reducers/gameReducer';
import PageFooter from "../../components/PageFooter";

function HomePanelPlaceholder({ router }) {
    const isDesktop = useSelector((state => state.main.isDesktop))
    const locations = useSelector((state => state.locations.locations))
    const gameStorage = useSelector((state) => state.game)
    const [time, setTime] = useState(gameStorage.members.length * 60)
    const [isView, setView] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        let timerId = setTimeout(setTime, 1000, time - 1);
        if (time === 0) {
            clearTimeout(timerId)
            flashSet()
        }
    }, [time])

    useEffect(() => {
        return () => {
            setTime(1)
            bridge.send("VKWebAppFlashSetLevel", {"level": 0});
        }
    }, [])

    async function flashSet() {
        while(time === 0) {
            await bridge.send("VKWebAppFlashSetLevel", {"level": 1});
            await new Promise(resolve => setTimeout(resolve, 1000))

            await bridge.send("VKWebAppFlashSetLevel", {"level": 0});
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }

    return(
        <>
            <PanelHeader
                left={
                    <Counter className={'fixPaddingCount'}>
                        {/*eslint-disable-next-line*/}
                        🕗 {Math.floor(time/60)}:{time % 60 < 10 && "0"}{time % 60}
                    </Counter>
                }
                separator={isDesktop}
            >
                Игра
            </PanelHeader>

            <Group>
                {time === 0 &&
                    <Placeholder
                        icon={<Icon56BlockOutline/>}
                        header={'Упс...'}
                        action={
                            <Button
                                size="m"
                                onClick={() => {
                                    router.toView('home/')
                                    router.toModal('registGame')
                                }}
                            >
                                Начать еще раз
                            </Button>
                        }
                    >
                        Время выделенное на игру вышло, сыграем ещё раз?
                    </Placeholder>
                }

                {time !== 0 && (!isView ?
                    <Placeholder
                        icon={<Icon56GhostOutline/>}
                        header={`${gameStorage.members[gameStorage.activeMember].name}, ваш ход!`}
                        action={
                            <Button
                                size="m"
                                onClick={() => setView(true)}
                            >
                                Посмотреть свою локацию
                            </Button>
                        }
                        stretched={!isDesktop}
                    /> :
                    <>
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
                            <>
                                <Div className={'div-center'}>
                                    <img
                                        src={'https://meme-police.ru/spyfall/spy.jpg'}
                                        alt={'Шпион'}
                                        className={'imgStartGame'}
                                    />
                                </Div>

                                <Header>Доступные локации</Header>
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
                            </>
                        }

                        <FixedLayout filled vertical="bottom" className={isDesktop && 'fixedMarginFixedLayout'}>
                            <Separator wide />
                            <Div>
                                <ButtonGroup mode="horizontal" gap="m" stretched>
                                    <Button
                                        size="l"
                                        appearance="accent"
                                        stretched
                                        onClick={() => setView(false)}
                                    >
                                        Спрятать роль
                                    </Button>

                                    <Button
                                        size="l"
                                        appearance="positive"
                                        stretched
                                        onClick={() => {
                                            setView(false)
                                            if (gameStorage.activeMember + 1 === gameStorage.members.length) {
                                                dispatch(set({ key: 'activeMember', value: 0 }))
                                            } else {
                                                dispatch(set({ key: 'activeMember', value: gameStorage.activeMember + 1 }))
                                            }
                                        }}
                                    >
                                        Далее
                                    </Button>
                                </ButtonGroup>
                            </Div>
                        </FixedLayout>
                    </>
                )}
            </Group>
        </>
    )
}

export default withRouter(HomePanelPlaceholder);