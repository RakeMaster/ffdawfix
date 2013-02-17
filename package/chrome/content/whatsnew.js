var txt = '<html:font style="color:red;">Минимальная версия FireFox увеличена до 10,0</html:font>. Теперь при установке не требуется перезапуск Firefox.В "Клан - Помощь в бою" добавлены ссылки на персонажей.При клике на персонажа во вкладке "Члены клана" будет отправляться приватное собщение вместо публичного.Гости на форуме объединены в одну группу.Исправлены картинки в пещере.Исправлен глюк с открытием боя в новой вкладке.На форуме добавлена функция "Поиск от Google".Исправлен глюк с вылетом за границы кнопки "Удалить" в ПМ.Исправлен глюк с размером шрифта на форуме.Исправлен глюк со смайлами на форуме.Пустые группы в походе теперь не будут отображаться.Подправлена прокрутка в лабиринте.Исправлена функция "Статистика клана".Исправлен глюк с "пропавшим" значком разбойника в походе.';

var parts = txt.split('.').filter(function(item){return item});
var html = '<html:ul><html:li>' + parts.join('.</html:li><html:li>') + '.</html:li></html:ul>';

document.getElementById('text').innerHTML = html;

Components.utils.import("resource://gre/modules/AddonManager.jsm");
AddonManager.getAddonByID("ffdawfix@dclan.ru", function(addon) {
	document.getElementById('version').textContent = "Версия " + addon.version;
});