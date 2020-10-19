import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap'
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

import history from '../../../services/history'
import { Button, ContainerPopOver } from './styles'

export default function OptionsButton({ postId }) {

    function openPopOver(e) {
        e.stopPropagation();
        console.log("caiu aqui ", postId);
    }

    function edit(e) {
        e.stopPropagation();
        console.log('edit ', postId);

        history.push({
            pathname: '/editor',
            state: { postId }
        });
    }

    function remove(e) {
        e.stopPropagation();
        console.log('remove ', postId)
        toast.info('Funcionalidade ainda não implementada');
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                <ContainerPopOver>
                    <div onClick={edit}>
                        <FaEdit />
                        <span>Editar post</span>
                    </div>
                    <div onClick={remove}>
                        <FaTrash color='#FF0000'/>
                        <span>Excluir post</span>
                    </div>
                </ContainerPopOver>
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose={true}>
            <Button onClick={openPopOver}>
                <FaEllipsisV size={20}/>
            </Button>
        </OverlayTrigger>
    );
}
