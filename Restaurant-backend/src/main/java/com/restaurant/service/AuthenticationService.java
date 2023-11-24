package com.restaurant.service;

import com.restaurant.model.Person;
import com.restaurant.model.auth.AuthenticationRequest;
import com.restaurant.model.auth.AuthenticationResponse;
import com.restaurant.model.registerUser.UserRegister;

public interface AuthenticationService {

    String signUp(UserRegister userRegister);

    AuthenticationResponse login(AuthenticationRequest request, AuthenticationResponse response);

}
