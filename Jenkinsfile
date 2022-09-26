#!/usr/bin/env groovy

pipeline {
  agent any

  tools {NODEJS 'node'}

  stages {    
    stage('Cloning Git') {
      steps {
        git 'https://github.com/shailjava/tokensystem'
      }
    }        
    stage('Install dependencies') {
      steps {
        bat 'node --version'
      }
    }     
    stage('Test') {
      steps {
         echo 'project Running...............'
      }
    }             
  }
}
