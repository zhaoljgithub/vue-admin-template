import moment from 'moment';
moment.locale('zh-cn');

export const timeFormate=(time: number,reg = "YYYY-MM-DD HH:mm:ss")=>{
  return time ? moment(new Date(parseInt(time + ''))).format(reg):"";
}