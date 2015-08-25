$('#promiscuidade').bind('click', function() {
	$(this).toggleClass('ativo');
});

$('.nl-field .nl-field-toggle').bind('click', function() {
	$('.nl-field input').focus();
});

$('.icon-menu').bind('click', function() {
	$('#menu').fadeIn('fast');
});

$('.fechar-menu').bind('click', function() {
	$('#menu').fadeOut('fast');
});

shortcut.add("Ctrl+Shift+z",function() {
	$("#mensagem").click();
});
