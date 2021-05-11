/*
 * Created on Fri Aug 09 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */

module.exports = class Response {
  static
  sendResponse(isSuccess, result, message, statusCode) {
    return {
      is_success: isSuccess,
      result,
      message,
      status_code: statusCode,
    };
  }
};
