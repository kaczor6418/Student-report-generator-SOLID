# SOLID  
  
## Co to jest ?  
To zbiór pięciu zasad, które definiją, w jaki sposób powinien być budowany, rozwijany i utrzymywany projekt od strony kodu. Korzystając z tych zasad kod,   
który powstanie nie powinien przypominać plątaniny przewodów podłączonych do bomby, która wybuchnie jeżeli usuniemy niewłaściwy przewód.  
  
## Przykładowa aplikacja  
Aby w przystępny sposób zaprezentować dlaczego warto stosować zasady SOLID stworzyłem prostą aplikację, w której zaprezentowałem różnice między kodem, w który nie uwzględniono tych zasad a kodem korzystającym z nich w prawidłowy sposób.
Przyjmijmy że tworzymy system przeznaczony dla pracowników uczelni wyższej, który ma być odpowiedzialny za tworzenie raportów na teamt wyników studentów oraz komunikacji z nimi.
  
## S: Single Responsibility Principle(SRP)  
>*Klasy i metody powinny być odpowiedzialne tylko za jedną rzecz oraz powinna istnieć tylko jeden powód aby je zmieniać*  
  
SRP wymaga, aby klasa miała tylko jeden powód do zmiany. Klasa zgodna z tą zasadą wykonuje tylko kilka powiązanych zadań. Myśląc w ramach SRP, nie trzeba ograniczać się tylko do problemów powiązanych z klasami. 
Zasadę SRP można zastosować także do metod czy modułów, upewniając się, że są odpowiedzialne, tylko za jedną rzecz oraz  że mają tylko jeden powód do zmiany.

**Zadanie:**

Doktor Jan Kowalski zgłosił potrzebę generowania raportów z wynikami jego studentów z różnych grup, oraz możliwości przesyłania tych raportów.
  
### Złe podejście
  
```typescript
class StudentsReportService {
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
        }
        // create formatted report
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
>Code
<p align="center">
  <img src="https://lh3.googleusercontent.com/pw/ACtC-3enk9PYIM7pEnH61XJx8Xe5hk5gqiN8H9m1BJpr6xYTbImF0lSpJlwUa4yqcpXs9jVid-fv9vSk0FuJFAAjjnJY9Exb2rYenZXOBhjKcplAc1XYcpwxTmhfGw9wXMUGnD70gsmIDjo03-eLmFVehrE=w978-h452-no" alt="StudentsServiceInvalidUNL"/>
</p>

>UML Diagram

Powyższa klasa nie stosuje zasad SOLID i ma parę błędów, które poniżej wypunktuję:
 - ```generateReport``` → nie jest odpowiedzialny tylko za generowanie raportów ale równierz za automatyczne wysyłanie tych raportów emailem. Jest to słabe rozwiązanie ponieważ,
 jeżeli osoba generująca raportu ustawi sobie jakąś regółę, która będzie automatycznie generować raport dla wszystkich grup studentów powiedzmy cylicznie codziennie, wtedy prawdopodbnie
 zawalimy komuś skrzynkę a może nawet wyślemy dane, które nie powinny być wysłane.
 
 - ```formatReport``` → formatuje raport w zależności dla kogo ma być on stworzony, ale co w wypadku gdy będzmey chieli dodać raport dla studenta lub innych użytkowników?
 Funkcja wraz z całą klasą urośnie do ogromnych rozmiarów co przyczyni się do tego, że kod będzie trudny w czytaniu, ciężko będzie się go utrzymywać i testować.
 Ponadto zmiany w tej jednej mogą mieć wpływ na całą klasę z czym wiąże się prawdopodbne wygenerowanie błędów.

### Dobre podejście

## O: Open-Closed Principle(OCP)  
>*Elementy oprogramowania powinny być otwarte na rozszerzanie ale zamknięte na modyfikacje*  
  
Ryzyko zmiany istniejącej klasy polega na tym, że możemy nieumyślnie wprowadzić zmianę w logice oraz zachowaniu klasy. Rozwiązaniem tego problemu jest stworzenie klasy,  
która przesłoni logikę działania oryginalnej klasy. Wykorzystując tę zasadę, będzie znacznie łatwiej utrzymywać napisany kod (nieoczekiwane zmiany w logice, bugi...) oraz reużywać  już raz stworzonego kodu.  
  
## L: Liskov Substitution Principle (LSP)  
>*Klasy potomne nigdy nie powinny łamać definicji typów klas nadrzędnych*  
  
Klasa dziedzicząca z klasy podstawowej powinna jedynie rozszerzać funkcjonalność (subklasa nie powinna modyfikować zachowania klasy podstawowej np.: ilość przyjmowanych argumentów konstruktora / funkcji) 
klasy bazowej oraz zwracać ten sam typ danych. Oznacza to, że w miejscu klasy bazowej powinniśmy być w stanie skorzystać z dowolnej klasy po niej dziedziczącej.  
  
## I: Interface Segregation Principle (ISP)  
>*Użytkownik nie powinien musieć polegać na interfejsacg, których nie używa*  
  
Często jest tak, że interfejs jest opisem całej klasy. ISP to zasada, która mówi, że klasa powinna być opisana szeregiem mniejszych interfejsów (bardziej szczegółowych odpowiedzialnych tylko za jedną rzecz SRP),   
które udostępniają tylko niektóre zasoby klasy zamiast całej jej zawartości w jednym miejscu.  
  
## D: Dependency Inversion Principle (DIP)  
>*Abstrakcja nie powinna zależeć od detali. Detale powinny zależeć od abstrakcji*  
  
Abstrakcja lub moduł niższego poziomu nie powinien być zależny od klas czy modułów wyższego poziomu, ponieważ zmiany, które będą wymagane do wprowadzenia w bardziej wysokopoziomowej klasie prawdopodbnie  
będą miały wpływ na niskopoziomową klasę / moduł, przez co wymagane będą zmiany w klasach / modułach, które korzystają te bardziej niskopoziomową
