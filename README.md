# SOLID    
 ## Co to jest ? To zbiór pięciu zasad, które definiują, w jaki sposób powinien być budowany, rozwijany i utrzymywany projekt od strony kodu. Korzystając z tych zasad kod,     
który powstanie nie powinien przypominać plątaniny przewodów podłączonych do bomby, która wybuchnie jeżeli usuniemy niewłaściwy przewód.    
    
## Przykładowa aplikacja 
Aby w przystępny sposób zaprezentować dlaczego warto stosować zasady SOLID stworzyłem prostą aplikację, w której zaprezentowałem różnice między kodem, w który nie uwzględniono tych zasad a kodem korzystającym z nich w prawidłowy sposób.  
Przyjmijmy, że tworzymy system przeznaczony dla pracowników uczelni wyższej, który ma być odpowiedzialny za tworzenie raportów na temat wyników studentów oraz komunikacji z nimi.  
    
## S: Single Responsibility Principle(SRP) 
>*Klasy i metody powinny być odpowiedzialne tylko za jedną rzecz oraz powinna istnieć tylko jeden powód aby je zmieniać*    

 SRP wymaga, aby klasa miała tylko jeden powód do zmiany. Klasa zgodna z tą zasadą wykonuje tylko kilka powiązanych zadań. Myśląc w ramach SRP, nie trzeba ograniczać się tylko do problemów powiązanych z klasami.   
Zasadę SRP można zastosować także do metod czy modułów, upewniając się, że są odpowiedzialne, tylko za jedną rzecz oraz  że mają tylko jeden powód do zmiany.  
  
**Zadanie:**  
  
Doktor Jan Kowalski zgłosił potrzebę generowania raportów z wynikami jego studentów z różnych grup, oraz możliwości przesyłania tych raportów.  
    
### Złe podejście  

```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    private formatReport(type: ReportType): HTMLElement {
        const formattedReport = document.createElement('table');
        switch (type) {
            case ReportType.DEAN:
                // Logic responsible for generating report for dean  
                break;
            case ReportType.LECTURER:
                // Logic responsible for generating report for lecturer  
                break;
            case ReportType.UNIVERSITY_WORKER:
                // Logic responsible for generating report for university worker  
                break;
            default:
                throw Error('Not supported report type')
        }        // create formatted report  
        return formattedReport;
    }

    public generateAndSendReport(email: string, type: ReportType): Promise<void> {
        const preparedReport: HTMLElement = this.formatReport(type);
        void SaveFileService.saveFile(preparedReport);
        void UniversityEmailService.sendEmail(email, preparedReport);
        return Promise.resolve();
    }
}  
```  
>Kod
  
<p align="center">  
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3enk9PYIM7pEnH61XJx8Xe5hk5gqiN8H9m1BJpr6xYTbImF0lSpJlwUa4yqcpXs9jVid-fv9vSk0FuJFAAjjnJY9Exb2rYenZXOBhjKcplAc1XYcpwxTmhfGw9wXMUGnD70gsmIDjo03-eLmFVehrE=w978-h452-no" alt="StudentsServiceBadUNL"/>  
</p>  
  
>Diagram UML
  
Powyższa klasa nie stosuje zasad SOLID i ma parę błędów, które poniżej wypunktuję:  
 - ```generateReport``` → nie jest odpowiedzialny tylko za generowanie raportów, ale również za automatyczne wysyłanie tych raportów e-mailem. Jest to słabe rozwiązanie, ponieważ, jeżeli osoba generująca raportu ustawi sobie jakąś regułę, która będzie automatycznie generować raport dla wszystkich grup studentów (powiedzmy cyklicznie codziennie), wtedy prawdopodobnie zawalimy komuś skrzynkę, a może nawet wyślemy dane, które nie powinny być wysłane.  
  
### Dobre podejście  
```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private formatReport(type: ReportType): HTMLElement {
        const formattedReport = document.createElement('table');
        switch (type) {
            case ReportType.DEAN:
                // Logic responsible for generating report for dean  
                break;
            case ReportType.LECTURER:
                // Logic responsible for generating report for lecturer  
                break;
            case ReportType.UNIVERSITY_WORKER:
                // Logic responsible for generating report for university worker  
                break;
            default:
                throw Error('Not supported report type')
        }        // create formatted report  
        return formattedReport;
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    public getReport(type: ReportType): HTMLElement {
        return this.formatReport(type);
    }
}

const studentsReport: StudentsReport = new StudentsReport([]);
const report: HTMLElement = studentsReport.getReport(ReportType.DEAN);
void GenerateReportService.generateReport('./path', report);
void UniversityEmailService.sendEmail('test@test.pl', report);  
```  
>Kod
  
<p align="center">  
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3dbx9-v_6iKPjbEM_xo1spz1gz337peoTMsVN0_CpKU948AbBrzD0r6rbrWuFgCm-1o_DXGcg7yChZPxYqPN4yWnPE3BWmPAgyhiIgM6fvuL_Mo1yEdFDzqhKxfyP8tM4SoFn9h8TMb3WIglGyL2pM=w874-h412-no" alt="StudentsServiceGoodUNL"/>  
</p>  
  
>Diagram UML
  
Po refaktoryzacji możemy zauważyć, że **StudentsReport** odpowiada w tym momencie tylko za utworzenie odpowiednio sformatowanego raportu, który zostanie utworzony przez jeden z formaterów. Może i metoda odpowiadająca za formatowanie składa się z wielu ifów, ale odpowiada tylko za jedną rzecz, mianowicie formatowanie raportu. Generowanie raportu na dysk oraz wysyłanie raportu jest realizowane przez dwie niezależne od siebie klasy. Takie klasy są teraz odpowiedzialne tylko za jedną rzecz oraz mają tylko jeden powód do zmiany  
  
## O: Open-Closed Principle(OCP) 
>*Elementy oprogramowania powinny być otwarte na rozszerzanie ale zamknięte na modyfikacje*    

Ryzyko zmiany istniejącej klasy polega na tym, że możemy nieumyślnie wprowadzić zmianę w logice oraz zachowaniu klasy. Rozwiązaniem tego problemu jest stworzenie klasy,    
która przesłoni logikę działania oryginalnej klasy. Wykorzystując tę zasadę, będzie znacznie łatwiej utrzymywać napisany kod (nieoczekiwane zmiany w logice, bugi...) oraz reużywać  już raz stworzonego kodu.    

### Złe podejscie
```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private formatReport(type: ReportType): HTMLElement {
        const formattedReport = document.createElement('table');
        switch (type) {
            case ReportType.DEAN:
                // Logic responsible for generating report for dean  
                break;
            case ReportType.LECTURER:
                // Logic responsible for generating report for lecturer  
                break;
            case ReportType.UNIVERSITY_WORKER:
                // Logic responsible for generating report for university worker  
                break;
            default:
                throw Error('Not supported report type')
        }        // create formatted report  
        return formattedReport;
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    public getReport(type: ReportType): HTMLElement {
        return this.formatReport(type);
    }
}
```
>Kod

<p align="center">  
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3fVMjoYFjKMSZkB5LyF_myvg80NCxUYcJyjdlXWRa9gbiW3UoneiT_SiV-7WIA9UxFulmJf8ih1r_SRooTFhpjgH8Vap0j_YpdD3h2zMuwPYwNyyVLZQQD250FDDWCmPIT_GcQxRPoWL2b8__5t71Ii=w512-h412-no" alt="StudentsServiceGoodUNL"/>  
</p>  
  
>Diagram UML

Podejście to ma parę wad, które wymienię poniżej:  
 - ```formatReport``` → formatuje raport w zależności, dla kogo ma być on stworzony. Co w wypadku gdy będziemy chcieli dodać raport dla studenta lub innych użytkowników? Funkcja wraz z całą klasą urośnie, do ogromnych rozmiarów, co przyczyni się do tego, że kod będzie trudny w czytaniu, ciężko będzie się go utrzymywać i testować.  Ponadto zmiany w tej jednej funkcji, mogą mieć wpływ na całą klasę, z czym wiąże się prawdopodobne wygenerowanie błędów.

## L: Liskov Substitution Principle (LSP) 
>*Klasy potomne nigdy nie powinny łamać definicji typów klas nadrzędnych*    

 Klasa dziedzicząca z klasy podstawowej powinna jedynie rozszerzać funkcjonalność (subklasa nie powinna modyfikować zachowania klasy podstawowej np.: ilość przyjmowanych argumentów konstruktora / funkcji) klasy bazowej oraz zwracać ten sam typ danych. Oznacza to, że w miejscu klasy bazowej powinniśmy być w stanie skorzystać z dowolnej klasy po niej dziedziczącej.    
    
## I: Interface Segregation Principle (ISP)
>*Użytkownik nie powinien musieć polegać na interfejsacg, których nie używa*   
 
 Często jest tak, że interfejs jest opisem całej klasy. ISP to zasada, która mówi, że klasa powinna być opisana szeregiem mniejszych interfejsów (bardziej szczegółowych odpowiedzialnych tylko za jedną rzecz SRP),     
które udostępniają tylko niektóre zasoby klasy zamiast całej jej zawartości w jednym miejscu.    
    
## D: Dependency Inversion Principle (DIP) 
>*Abstrakcja nie powinna zależeć od detali. Detale powinny zależeć od abstrakcji*   
 
 Abstrakcja lub moduł niższego poziomu nie powinien być zależny od klas czy modułów wyższego poziomu, ponieważ zmiany, które będą wymagane do wprowadzenia w bardziej wysokopoziomowej klasie prawdopodbnie    
będą miały wpływ na niskopoziomową klasę / moduł, przez co wymagane będą zmiany w klasach / modułach, które korzystają te bardziej niskopoziomową
