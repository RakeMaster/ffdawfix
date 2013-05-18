var txt = 'Исправлен глюк с подарками, при открытии которых выскакивало подтверждение. В скупочном магазине добавлена кнопка "Продать все ресурсы". Добавлено подтверждение при выходе с лабиринта. Исправлены глюки с обновлением страницы. Добавлено звуковое оповещение о начале боя. Исправлен глюк с рекламой в чате, не позволяющий скопировать первую строчку чата. Исправлен глюк с картинками на ресурсы в рюкзаке. Добавлены ссылки в системных сообщениях на персонажей заходящих в игру. На форуме добавлены кнопки вверх/вниз страницы. На форуме добавлены кнопки для получения ссылки на конкретный пост.';

var parts = txt.split('.').filter(function(item){return item});
var html = '<html:ul><html:li>' + parts.join('.</html:li><html:li>') + '.</html:li></html:ul>';

document.getElementById('text').innerHTML = html;

Components.utils.import("resource://gre/modules/AddonManager.jsm");
AddonManager.getAddonByID("ffdawfix@dclan.ru", function(addon) {
	document.getElementById('version').textContent = "Версия " + addon.version;
});