import { Modal, ModalOverlay, ModalHeader, 
    ModalContent, ModalFooter, ModalBody, 
    ModalCloseButton, Button, FormControl, 
    FormLabel, Input, Box } from "@chakra-ui/react"

import { useState } from "react"

const ModalComp = ({data, setData, dataEdit, isOpen, onClose}) =>{
    const [nome, setNome] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const handleSave = () => {
        if (!nome || !email) return;

        if (emailAlreadyExists()){
            return alert ("E-mail já Cadastrado!")
        }

        if (Object.keys(dataEdit).length){
            data[dataEdit.index] ={nome, email};
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data:[]), {nome, email}]
            : [...(data ? data:[])]
        localStorage.setItem("cad_Cliente", JSON.stringify(newDataArray))

        setData(newDataArray);

        onClose();
    };

    const emailAlreadyExists = () =>{
        if (dataEdit.email !== email && data?.length){
            return data.find((item) => item.email === email)
        } return false
    }
    return(
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Cadastro do Cliente</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl dipaly = "flex" flexDir ="column" gap={4} >
                        <Box>
                            <FormLabel>Nome</FormLabel>
                            <Input 
                                type="text"
                                value={nome}
                                onChange ={(e) => setNome(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel>E-Mail</FormLabel>
                            <Input 
                                type="email"
                                value={email}
                                onChange ={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                    </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="center">
                    <Button colorScheme="green" mr={3} onClick={handleSave}>Salvar</Button>
                    <Button colorScheme="red"  onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default ModalComp