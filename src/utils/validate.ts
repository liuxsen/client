export function fnValidatePassword(
  rule: any,
  value: string,
  callback: (arg?: string) => {},
) {
  const rIsIllegalChar = new RegExp(/^[\.0-9A-Za-z]+$/);
  const rIsOnlyCharExist = new RegExp(/^[A-Za-z]+$/);
  const rIsOnlyNumExist = new RegExp(/^[0-9]+$/);
  const rIsOnlySpCharExist = new RegExp(/^[\.]+$/);

  if (value.indexOf(' ') !== -1) {
    callback('密码中不能含有空格');
  } else if (!rIsIllegalChar.test(value)) {
    callback('请输入正确的密码');
  } else if (rIsOnlyCharExist.test(value)) {
    callback('密码中不能只含有字母，请再添加数字或点(.)');
  } else if (rIsOnlyNumExist.test(value)) {
    callback('密码中不能只含有数字，请再添加字母或点(.)');
  } else if (rIsOnlySpCharExist.test(value)) {
    callback('密码中不能只含有点(.)，请再添加字母或数字');
  } else {
    callback();
  }
}

export function fnValidatePhone(
  rule: any,
  value: string,
  callback: (arg?: string) => {},
) {
  const reg = new RegExp(/^1[0-9]{10}$/g);
  if (!reg.test(value)) {
    callback('请输入正确的手机号码');
  } else {
    callback();
  }
}

export function fnValidateNickname(
  rule: any,
  value: string,
  callback: (arg?: string | undefined) => any,
) {
  const reg = new RegExp(/^[\u4E00-\u9FA5\.\w-]+$/g);
  if (!reg.test(value)) {
    callback('只允许输入中英文字符、数字、划线(_-)和点(.)');
  } else {
    callback();
  }
}

// 检查邮箱格式是否正确
export function fnValidateEmail(
  rule: any,
  value: string,
  callback: (arg?: string | undefined) => any,
) {
  const reg = /[\w-\.]+@([\w-]+\.)+[a-z]{2,}/;
  if (reg.test(value)) {
    callback();
  } else {
    callback('请输入合法的邮箱');
  }
}

// 检查 密码格式是否符合
export function fnValidatePwd(password: string) {
  password = password.trim();
  const oRegIsNum = /\d/;
  const oRegIsWords = /[a-zA-Z]/;
  const bHasNum = oRegIsNum.test(password);
  const bHasWords = oRegIsWords.test(password);
  // 如果 至少含有 数字 并且至少含有 一个字母 返回 true
  if (password.length >= 8 && password.length <= 20 && bHasNum && bHasWords) {
    return true;
  } else {
    return false;
  }
}
