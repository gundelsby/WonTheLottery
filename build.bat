@echo off
call mkdir dist

REM CSS files
@echo on
@call juicer merge -f -o dist/wonthelottery.css css/wonthelottery.css
@echo off

REM Scripts
REM @echo on
@call juicer merge -f -s -o dist/wonthelottery.js js/wonthelottery.js
REM @echo off


@pause