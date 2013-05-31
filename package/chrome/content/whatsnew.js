var txt = 'Добавлена функция "Улучшенный чат".Из "Кубика" убран случайный удар + подтверждение.В кубике довавлено подтверждение кнопкой Enter.Добавлена возможность добавлять смайлики прямо из чата.Теперь кнопка "Отменить" при заходе из ПМ будет возвращать обратно в сообщения.Для модераторов исправлена "Информация".';

var parts = txt.split('.').filter(function(item){return item});
var html = '<html:ul><html:li>' + parts.join('.</html:li><html:li>') + '.</html:li></html:ul>';

document.getElementById('text').innerHTML = html;

Components.utils.import("resource://gre/modules/AddonManager.jsm");
AddonManager.getAddonByID("ffdawfix@dclan.ru", function(addon) {
	document.getElementById('version').textContent = "Версия " + addon.version;
});