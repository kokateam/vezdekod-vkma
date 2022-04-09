import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    IOS,
    FormItem,
    Input,
    FormLayout, Button
} from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel } from '@vkontakte/icons'
import { set } from "../../reducers/gameReducer";
import locations from "../../../data/locations.json";

function RegistGameModal({ nav, router }) {
    const platform = useSelector((state) => state.main.platform)
    const gameStorage = useSelector((state) => state.game)
    const dispatch = useDispatch()

    dispatch(set({ key: 'activeMember', value: 0 }))

    function regist() {
        let randomLocation = Math.floor(Math.random() * 30)
        dispatch(set({ key: 'location', value: locations[randomLocation] }))
        let location = locations[randomLocation]

        let arr = []
        for (let i = 0; i < gameStorage.memberCount; i++) {
            arr.push({
                id: i,
                name: `Игрок-${i+1}`,
                isSpy: false,
                job: location.job[Math.floor(Math.random() * location.job.length)]
            })
        }

        let random = Math.floor(Math.random() * gameStorage.memberCount)
        arr[random].isSpy = true
        if (gameStorage.memberCount >= 9) {
            let random2 = Math.floor(Math.random() * gameStorage.memberCount)
            while(random === random2) {
                random2 = Math.floor(Math.random() * gameStorage.memberCount)
            }

            arr[random2].isSpy = true
        }

        dispatch(set({ key: 'members', value: arr }))
        router.toBack()
        router.toPanel('startGame')
    }

    return (
        <ModalPage
            nav={nav}
            header={
                <ModalPageHeader
                    left={platform !== IOS && 
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Cancel/>
                        </PanelHeaderButton>
                    }

                    right={platform === IOS && 
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Dismiss/>
                        </PanelHeaderButton>
                    }
                >
                    Регистрация
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <FormLayout>
                <FormItem
                    top={'Количество игроков'}
                    bottom={
                        gameStorage.memberCount < 3 ?
                            "Меньше 3 участников не может быть!" :
                            (gameStorage.memberCount >= 9 ? 'В игре будет два шпиона.' : 'В игре будет один шпион.')
                    }
                    status={gameStorage.isError ? "error" : "default"}
                >
                    <Input
                        placeholder={'Введите число...'}
                        value={gameStorage.memberCount}
                        onChange={(e) => {
                            dispatch(set({ key: 'memberCount', value: e.currentTarget.value }))
                            dispatch(set({ key: 'isError', value: Number(e.currentTarget.value) < 3 }))
                        }}
                        type="number"
                        inputmode="decimal"
                    />
                </FormItem>

                <FormItem>
                    <Button
                        stretched
                        size={'l'}
                        onClick={() => {
                            dispatch(set({ key: 'memberCount', value: Number(gameStorage.memberCount) }))
                            regist()
                        }}
                        type={'submit'}
                    >
                        Начать игру!
                    </Button>
                </FormItem>
            </FormLayout>
        </ModalPage>
    );
}

export default withRouter(RegistGameModal);