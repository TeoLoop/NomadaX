package com.nomadax.service;

import com.nomadax.dto.UserDTO;
import com.nomadax.entity.User;
import com.nomadax.repository.IUserRepository;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private IUserRepository userRepository;

    //OBTENER TODOS LOS USUARIOS
    public List<UserDTO> findAll(){
        List<User> users = userRepository.findAll();

        List<UserDTO> userDTOList= new ArrayList<>();

        for (User user : users){
            userDTOList.add(new UserDTO(user.getId(), user.getName(), user.getLastName(), user.getEmail(), user.getRole(), user.getImage()));
        }

        return userDTOList;
    }

    //ACTUALIZAR USUARIO
    public UserDTO update(UserDTO userUpdated){
        Optional<User> userToUpdate= userRepository.findById(userUpdated.getId());
        if (userToUpdate.isPresent()){
            userToUpdate.get().setName(userUpdated.getName());
            userToUpdate.get().setLastName(userUpdated.getLastName());
            userToUpdate.get().setRole(userUpdated.getRole());
            userToUpdate.get().setEmail(userUpdated.getEmail());

            userRepository.save(userToUpdate.get());

            return userUpdated;
        }else{
            return null;
        }

    }

    //BUSCAR USUARIO CUANDO ALGUIEN INTENTA LOGUEARSE

    @Override
    public UserDetails loadUserByUsername(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("EMail no registrado: "+ email));
    }


    //DEVULEVE info DE LA PERSONA
    public UserDTO getUserInfo( String email){
        UserDTO user= new UserDTO(userRepository.findByEmail(email).get().getId(), userRepository.findByEmail(email).get().getName(), userRepository.findByEmail(email).get().getLastName(), userRepository.findByEmail(email).get().getEmail(), userRepository.findByEmail(email).get().getRole(), userRepository.findByEmail(email).get().getImage());
        return user;
    }


    //DEVUELVE SI ES ADMIN
    public Boolean isAdmin(String name){
        Optional<User> userFinded = userRepository.findByEmail(name);

        if (userFinded.isPresent()){
            String isAdmin = String.valueOf(userFinded.get().getRole());
            return Objects.equals(isAdmin, "ADMIN");
        }
        return null;
    }
}
