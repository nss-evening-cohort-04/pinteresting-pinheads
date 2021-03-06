"use strict";
app.factory("BoardFactory", function($q, $http, FIREBASE_CONFIG){
	//Firebase: get all Items
	var getBoardList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let boards = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		boards.push(response[key]);
			 	});
			 	resolve(boards);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	//Firebase: send a new item to Firebase
	var postNewBoard = function(newBoard){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/boards.json`, JSON.stringify({
				boardTitle: newBoard.boardTitle,
				uid: newBoard.uid
				})
			)
			 .success( (postResponse)=>{
			 	resolve(postResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	var deleteBoard = function(boardId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	var getSingleBoard = function(boardId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`)
			 .success( (getSingleReponse)=>{
			 	resolve(getSingleReponse);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var editBoard = function(editBoard){
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/boards/${editBoard.id}.json`, 
				JSON.stringify({
					boardTitle: editBoard.boardTitle,
					uid: editBoard.uid
				})
			)
			 .success( (editResponse)=>{
			 	resolve(editResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	return {getBoardList:getBoardList, postNewBoard:postNewBoard, deleteBoard:deleteBoard, getSingleBoard:getSingleBoard, editBoard: editBoard};
});

