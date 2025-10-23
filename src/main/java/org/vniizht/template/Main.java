package org.vniizht.template;

import com.fasterxml.jackson.databind.cfg.MapperBuilder;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class Main implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        Workbook workbook = new XSSFWorkbook();
        System.out.println("POI is working!");
        MapperBuilder mapperBuilder;
        System.out.println("Jackson is working!");
    }

    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}